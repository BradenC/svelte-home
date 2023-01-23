export enum PowerType {
    Battery = "battery",
    Main = "main"
}

export enum SensorState {
    Hi = "hi",
    Lo = "lo",
    On = "on"
}

export enum MoveState {
    Opening = "opening",
    Closing = "closing",
    Still = "still"
}

export enum DeviceKind {
    Device = "device",
    Router = "router",
    Bridge = "bridge"
}

export enum EndpointKind {
    Camera = "camera",
    ColorLight = "colorLight",
    Heater = "heater",
    Humidifier = "humidifier",
    TemperatureMeasurerSensor = "temperatureMeasurerSensor",
    HumidityMeasurerSensor = "humidityMeasurerSensor",
    Light = "light",
    Lock = "lock",
    Metadata = "metadata",
    Unknown = "unknown"
}
