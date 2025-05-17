import {AUTHORIZATION} from "./constants";

export function getAuthToken(AUTHORIZATION: string): string | null {
  return sessionStorage.getItem(AUTHORIZATION);
}

export function removeFromSessionStorage(keyName:string) : void {
   sessionStorage.removeItem(keyName);
}

export function setAuthToken(token:string):void {
  sessionStorage.setItem(AUTHORIZATION, 'Bearer ' + token);

}
