export class WeatherItemModel {
  constructor(
    public cityName: string,
    public tempMin: number,
    public tempMax: number,
    public description: string,
    public id?: string
  ){}
}
