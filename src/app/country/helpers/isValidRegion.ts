import { Region } from '../interfaces/restCountry.interface';

export const isValidRegion = (region: Region) => Object.values(Region).includes(region);
