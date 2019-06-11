import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatAutocompleteSelectedEvent, MatDialog, MatDialogRef, MatExpansionPanel} from '@angular/material';
import {DataFilter, FilterEntry} from '../model/DataFilter';
import {Task} from '../model/Task';
import {TaskService} from '../task.service';
import {Observable} from 'rxjs';
import {TaskStatus} from '../model/TaskStatus';
import {UserService} from '../user.service';
import {flatMap} from 'rxjs/operators';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../model/User';
import {ReflectionUtils} from '../model/ReflectionUtils';
import {ProjectService} from '../project.service';
import {NotificationsService} from '../notifications.service';

@Component({
  selector: 'create-task-modal',
  template: `
    <h1 mat-dialog-title>New task</h1>
    <form class="task-modal-form" mat-dialog-content (ngSubmit)="createTask(createTaskForm)"
          [formGroup]="createTaskForm">
      <mat-form-field>
        <input
          matInput
          placeholder="Task name"
          formControlName="name">
        <mat-error *ngIf="createTaskForm.controls['name'].hasError('required')">
          Field must not be null
        </mat-error>
      </mat-form-field>
      <mat-form-field>
        <input
          matInput
          #lookupPersonInput
          (input)="updateLoadedPersons(lookupPersonInput.value)"
          [formControl]="assignedPersonControl"
          [(ngModel)]="assignedPerson.realName"
          placeholder="Assign person"
          [matAutocomplete]="auto">
        <mat-autocomplete #auto='matAutocomplete' (optionSelected)="personSelected($event)">
          <mat-option *ngFor="let person of loadedPersons" [value]="person">
            {{person.realName}}
          </mat-option>
        </mat-autocomplete>
      </mat-form-field>
      <mat-form-field>
        <input
          name="deadline"
          formControlName="deadline"
          matInput
          [matDatepicker]="picker"
          placeholder="Deadline date"
        />
        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-datepicker touchUi #picker></mat-datepicker>
      </mat-form-field>
      <mat-form-field>
        <input
          name="description"
          formControlName="description"
          matInput
          placeholder="Description"
        />
      </mat-form-field>
      <mat-form-field>
        <mat-label>Task status</mat-label>
        <mat-select [(value)]="newTask.status" formControlName="status">
          <mat-option *ngFor="let status of statuses" [value]="status['status']" [innerText]="status['text']">
          </mat-option>
        </mat-select>

        <mat-error *ngIf="createTaskForm.controls['status'].hasError('required')">
          Field must not be null
        </mat-error>
      </mat-form-field>

      <div class="buttons-container">
        <button type="submit" mat-raised-button color="primary">
          Save
          <mat-icon>save</mat-icon>
        </button>

        <button
          type="button"
          mat-raised-button
          color="warn"
          (click)="discardChanges()">
          Cancel
          <mat-icon>cancel</mat-icon>
        </button>
      </div>
    </form>
  `,
  styles: [`
    .task-modal-form mat-form-field {
      width: 100%;
    }
  `]
})
export class CreateTaskModal {
  newTask: Task = new Task();
  assignedPersonControl: FormControl = new FormControl('');
  assignedPerson: User = new User();
  loadedPersons: User[];
  @ViewChild('lookupPersonInput')
  private lookupPersonInput: ElementRef<HTMLInputElement>;
  createTaskForm: FormGroup;
  statuses: object[] = [
    {status: TaskStatus.InWork, text: 'In Progress'},
    {status: TaskStatus.Completed, text: 'Completed'},
    {status: TaskStatus.Open, text: 'Open'}
  ];

  constructor(private userService: UserService,
              private projectService: ProjectService,
              private formBuilder: FormBuilder,
              private taskService: TaskService,
              private notifications: NotificationsService) {
    this.createTaskForm = this.formBuilder.group({
      description: [''],
      name: ['', Validators.required],
      deadline: [''],
      status: ['', Validators.required]
    });
  }

  updateLoadedPersons(searchTerm: string) {
    const filter = {
      realName: {operator: 'CONTAINS_I', value: searchTerm}, // case insensitive
      deleted: {operator: 'EQ', value: false}
    };
    const projection = ['realName', 'id', 'deleted', 'photoUrl'];
    this.userService.getByFilter(filter, projection, 0, 10).subscribe(users => {
      this.loadedPersons = users.map(user => ReflectionUtils.getInstanceFromRawObject(user, User));
    });
  }

  discardChanges() {
    this.newTask = new Task();
    modal.close();
  }

  personSelected(e: MatAutocompleteSelectedEvent) {
    const person = e.option.value;
    this.assignedPerson = person;
    this.loadedPersons.splice(this.loadedPersons.findIndex(u => u.id === person.id), 1);
    this.lookupPersonInput.nativeElement.value = '';
  }

  createTask(createTaskForm: FormGroup) {
    if (createTaskForm.valid) {
      this.newTask.name = createTaskForm.controls['name'].value;
      this.newTask.status = createTaskForm.controls['status'].value;
      this.newTask.description = createTaskForm.controls['description'].value;
      this.newTask.deadline = createTaskForm.controls['deadline'].value;
      this.newTask.assigneeId = this.assignedPerson.id;
      this.taskService.create(this.newTask).subscribe(result => {
        this.notifications.alert(`Task '${result.name}' has been created`);
        modal.close();
      });
    }
  }
}

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  tasksLoading: boolean = false;
  startDate: Date;
  filter: DataFilter = new DataFilter();
  personName: string;
  selectedViewMode: object;
  tasks: Task[];
  viewModes: object[] = [
    {statuses: [TaskStatus.Open, TaskStatus.InWork], text: TasksComponent.getViewModeByTaskStatus(TaskStatus.Open)},
    {statuses: [TaskStatus.Completed], text: TasksComponent.getViewModeByTaskStatus(TaskStatus.Completed)}
  ];

  constructor(private taskService: TaskService,
              private userService: UserService,
              private dialog: MatDialog) {
    this.selectedViewMode = this.viewModes[0];
    this.load();
  }

  static getViewModeByTaskStatus(taskStatus: TaskStatus) {
    let incompleteTasks = 'Incomplete tasks';
    let completedTasks = 'Completed tasks';
    switch (taskStatus) {
      case TaskStatus.InWork:
        return incompleteTasks;
      case TaskStatus.Open:
        return incompleteTasks;
      case TaskStatus.Completed:
        return completedTasks;
    }
  }

  ngOnInit() {
  }

  load() {
    this.tasksLoading = true;
    this.getTasks(this.selectedViewMode).subscribe(tasks => {
      this.tasksLoading = false;
      this.tasks = tasks;
    });
  }

  applyFilter(filterPanel: MatExpansionPanel) {

  }

  displayEntry(entry: FilterEntry) {

  }

  removeFilterEntry(entry: FilterEntry) {

  }

  private getTasks(viewMode: object): Observable<Task[]> {
    const userId = UserService.getCurrentUserId();
    return this.userService.getUserById(userId).pipe(
      flatMap(user => {
        return this.taskService.getByFilter({
          assigneeId: {operator: 'EQ', value: user.id},
          status: {operator: 'IN', value: viewMode['statuses']}
        });
      })
    );
  }

  setViewMode(viewMode: object) {
    this.selectedViewMode = viewMode;
  }

  noDataFound() {
    return this.tasks == null || this.tasks.length == 0;
  }

  openCreateTaskModal() {
    const taskModal = this.dialog.open(CreateTaskModal, {
      width: '30%'
    });
    modal = taskModal;
    taskModal.afterClosed().subscribe(result => {
      console.log('modal is closed');
    });
  }
}

let modal: MatDialogRef<CreateTaskModal>;
