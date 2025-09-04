export class AngularComponentsUtils {
  static asset(path: string) {
    return new URL(path, document.baseURI).toString();
  }
}
