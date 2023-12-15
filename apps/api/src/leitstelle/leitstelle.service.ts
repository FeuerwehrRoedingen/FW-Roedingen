import { Injectable } from '@nestjs/common';
import { Session } from '@prisma/client';

@Injectable()
export class LeitstelleService {

  /**
   * Create a new Session with the user {uid} as host
   * @param session 
   * @param uid
   * @returns the new session (with id)
   * @throws 
   */
  createSession(session: Omit<Session, "id">, uid: string){
    //TODO
  }

  /**
   * Get the session with the given id
   * @param sid 
   * @returns the session
   * @throws 404 if the session does not exist
   */
  getSession(sid: string){
    //TODO
  }

  /**
   * Join the session with the given id
   * @param sid 
   * @param password 
   * @param uid 
   * @returns the session
   * @throws 404 if the session does not exist
   */
  joinSession(sid: string, password: string, uid: string){
    //TODO
  }

  /**
   * Leave the session with the given id
   * @param sid 
   * @param uid 
   * @returns the session
   * @throws 404 if the session does not exist
   */
  leaveSession(sid: string, uid: string){
    //TODO
  }

  /**
   * Destroy the session with the given id
   * @param sid 
   * @throws
   */
  #destroySession(sid: string){
    //TODO
  }

  /**
   * Change the host of a given session to the user with the given id
   * @param sid 
   * @param uid 
   * @throws
   */  
  #moveHost(sid: string, uid: string){
    //TODO
  }
}
