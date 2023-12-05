export interface Camion {
    id?: number;
    camion_name: string;
    placa: string;
    propietario: string;
    capacidad: number;
    peso: number;
    estado: string;
    entregados: number;
    no_entregados: number;
    porcentaje: number;
    viajes: number;
    recaudacion: number;
}