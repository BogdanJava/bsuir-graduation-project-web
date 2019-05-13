import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Project} from '../../../model/Project';
import {User} from '../../../model/User';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent} from '@angular/material';
import {UserService} from '../../../user.service';
import {ReflectionUtils} from '../../../model/ReflectionUtils';
import {ProjectService} from '../../../project.service';
import {NotificationsService} from '../../../notifications.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {
  createProjectForm: FormGroup;
  project: Project = new Project();
  assignedPersons: FormControl;
  separators: number[];
  addedPersons: User[] = [];
  loadedPersons: User[];

  @ViewChild('lookupPersonInput')
  private lookupPersonInput: ElementRef<HTMLInputElement>;
  defaultPhoto = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Edit_icon_%28the_Noun_Project_30184%29.svg/1024px-Edit_icon_%28the_Noun_Project_30184%29.svg.png';

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private projectService: ProjectService,
              private notifications: NotificationsService) {
    this.createProjectForm = formBuilder.group({
      projectName: ['', Validators.required, this.projectAlreadyExists()],
      projectDescription: [''],
      projectPhotoUrl: ['']
    });
    this.assignedPersons = new FormControl('');
    this.separators = [ENTER, COMMA];
  }

  ngOnInit() {
  }

  createProject(createProjectForm: FormGroup) {
    if (this.controlsValid(createProjectForm)) {
      this.fillProject();
      this.projectService.createProject(this.project).subscribe(project => {
        this.notifications.pushNotification(`Project '${project.name}' created`);
      });
    }
  }

  private controlsValid(createProjectForm: FormGroup) {
    for (let controlsKey in this.createProjectForm.controls) {
      if (this.createProjectForm.controls[controlsKey].invalid) {
        return false;
      }
    }
    return true;
  }

  discardChanges() {
    for (let controlsKey in this.createProjectForm.controls) {
      this.createProjectForm.controls[controlsKey].setValue('');
    }
    this.assignedPersons.setValue('');
  }

  removeAssignedPerson(person: User) {
    this.addedPersons.splice(this.addedPersons.findIndex(u => u.id === person.id));
    this.loadedPersons.push(person);
  }

  personSelected(e: MatAutocompleteSelectedEvent) {
    const person = e.option.value;
    this.addedPersons.push(person);
    this.loadedPersons.splice(this.loadedPersons.findIndex(u => u.id === person.id), 1);
    this.lookupPersonInput.nativeElement.value = '';
  }

  updateLoadedPersons(searchTerm: string) {
    const filter = {
      realName: {operator: 'CONTAINS_I', value: searchTerm}, // case insensitive
      deleted: {operator: 'EQ', value: false}
    };
    const projection = ['realName', 'id', 'deleted', 'photoUrl'];
    this.userService.getByFilter(filter, projection, 0, 10).subscribe(users => {
      this.loadedPersons = users
        .map(user => ReflectionUtils.getInstanceFromRawObject(user, User))
        .filter(u => this.addedPersons.findIndex(user => user.id == u.id) === -1);
    });
  }

  configureUserAvatar(user: User) {
    return {
      backgroundImage: 'url(' + user.photoUrl + ')',
      backgroundSize: 'cover'
    };
  }

  private projectAlreadyExists(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      const projectName = control.value;
      return this.projectService.existsByName(projectName).toPromise().then(result => {
        return result ? {projectAlreadyExists: {value: true}} : null;
      });
    };
  }

  private fillProject() {
    this.project.name = this.createProjectForm.controls['projectName'].value;
    this.project.description = this.createProjectForm.controls['projectDescription'].value;
    this.project.photoUrl = this.createProjectForm.controls['projectPhotoUrl'].value;
    this.project.assignedPersonsIds = this.addedPersons.map(u => u.id);
  }
}
