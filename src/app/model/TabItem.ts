export class TabItem {
  constructor(public text: string,
              public icon: string,
              public path: string,
              public action?: () => void) {
    if (!action) {
      this.action = () => {
      };
    }
  }
}
