import { describe, expect, test } from '@jest/globals'

import { init, sendMessage, authenticateUser, createTestUser} from '../src/firebase'

describe(
  'Firebase',
  () => {
    test('initialize', () => {
      init();
    });
    test('send Message', () => {
      
    });
    test('authenticate user', async () => {
      let email = 'test@feuerwehr-roedingen.de';
      let password = 'secret1234';
      
      let user = await createTestUser(password, email);  
      
      if(!user)
        throw new Error('error creating testUser');
      
      let res = await authenticateUser(email, password);
      
      expect(res).toBe(true);
    });
  }
);
