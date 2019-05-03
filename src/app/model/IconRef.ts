export class IconRef {
  constructor(public badgeText: string,
              public icon: string,
              public path: string,
              public additionalInfo?: object,
              public action?: () => void) {
    if (!action) {
      this.action = () => {
      };
    }
    if (!additionalInfo) {
      this.additionalInfo = {};
    }
  }

  public addInfo(key: string, value): IconRef {
    this.additionalInfo[key] = value;
    return this;
  }
}
