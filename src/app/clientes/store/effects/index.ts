import { FacturasEffects } from './facturas.effects';
import { TareasEffects } from '../../../pages/task/store/effects/tareas.effects';
import { AuthEffects } from 'src/app/store/effects/auth.effects';
import { AlertEffect } from 'src/app/store/effects/alert.effects';
import { SpinnerEffects } from 'src/app/store/effects/spinner.efects';


export const EffectsArray: any[]=[
  // FacturasEffects,
  TareasEffects,
  AuthEffects,
  AlertEffect,
  AuthEffects,
  SpinnerEffects
 ]
