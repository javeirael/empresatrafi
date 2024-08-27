import axios, { endpoints } from 'src/utils/axios';

import { setSession } from './utils';

/** **************************************
 * Sign in
 *************************************** */
export const signInWithPassword = async ({ email, password }) => {
  try {
    const params = { email, password };

    const { data } = await axios.post(endpoints.auth.signIn, params);

    const { accessToken } = data.data;

    if (!accessToken) {
      throw new Error('Access token not found in response');
    }

    setSession(accessToken);
  } catch (error) {
    console.error('Error during sign in:', error);
    throw error;
  }
};

/** **************************************
 * Sign up
 *************************************** */
export const signUp = async ({ firstName, lastName, phoneNumber, accountId, email, password }) => {
  const params = {
    firstName,
    lastName,
    phoneNumber,
    accountId,
    email,
    password,
  };

  try {
    const { data } = await axios.post(endpoints.auth.signUp, params);

    return data;
  } catch (error) {
    console.error('Error during sign up:', error);
    throw error;
  }
};

/** **************************************
 * Sign out
 *************************************** */
export const signOut = async () => {
  try {
    await setSession(null);
  } catch (error) {
    console.error('Error during sign out:', error);
    throw error;
  }
};

/** **************************************
 * Forgot password
 * @description Enviar correo al usuario con tu token reset password ( esto se genera en el backend)
 *************************************** */

export const forgotPassword = async ({ email }) => {
  const params = { email };
  try {
    const { data } = await axios.post(endpoints.auth.forgotPassword, params);

    return data;
  } catch (error) {
    console.error('Error during password reset:', error);
    throw error;
  }
};

/** **************************************
 * Reset password
 * @description Cambio de contraseña con el token reset password ( esto se genera en el backend)
 * *************************************** */

export const resetPassword = async ({ password_reset_token, password, confirmPassword, id }) => {
  const params = { id, token: password_reset_token, password, confirmPassword };

  try {
    const { data } = await axios.post(endpoints.auth.resetPassword, params);

    return data;
  } catch (error) {
    console.error('Error during password reset:', error);
    throw error;
  }
};
