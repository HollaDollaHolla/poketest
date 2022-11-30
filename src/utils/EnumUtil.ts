export interface EnumItem<E = {[key: string]: any}> {
  Id: E;
  Name: keyof E;
  Hash: keyof E;
}

export class EnumHelper {
  public static checkFlag(enm: number, flag: number): boolean {
    // tslint:disable-next-line:no-bitwise
    return (enm & flag) === flag;
  }

  public static enumToArray<E>(Enum: any, exclude: any[] = [], isString: boolean = false): EnumItem<E>[] {
    if (isString) {
      return Object.keys(Enum)
        .filter((key: any) => !exclude.includes(key))
        .map((key: any) => ({Id: key, Name: Enum[key], Hash: Enum[key]} as EnumItem<E>));
    }
    return Object.keys(Enum)
      .filter((key: any) => !isNaN(Number(Enum[key])))
      .filter((key: any) => !exclude.includes(Enum[key]))
      .map((key: any) => ({Id: Enum[key], Name: key, Hash: key} as EnumItem<E>));
  }

  public static enumToObject<E>(Enum: any, exclude: any[] = [], isString: boolean = false): any {
    const array = this.enumToArray<E>(Enum, exclude, isString);

    const result: any = {};

    for (const item of array) {
      result[(item.Id as unknown as string).toString()] = item.Name;
    }

    return result;
  }
}
