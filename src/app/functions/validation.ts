import {ProjectService} from '../project.service';
import {AbstractControl, AsyncValidatorFn} from '@angular/forms';

export function projectAlreadyExists(projectService: ProjectService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    const projectName = control.value;
    return projectService.existsByName(projectName).toPromise().then(result => {
      return result ? {projectAlreadyExists: {value: true}} : null;
    });
  };
}
