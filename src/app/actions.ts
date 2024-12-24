'use server'

import { supabase } from '@/lib/supabase'
import { log } from 'console'

export async function subscribeToNewsletter(formData: FormData) {
  const email = formData.get('email')
  console.log('data', formData);
  
  
  if (!email || typeof email !== 'string') {
    return {
      success: false,
      message: "Please provide a valid email address."
    }
  }

  const { data, error } = await supabase
    .from('emails')  
    .insert([{ email }])
    console.log('yo', data);


  if (error) {
    console.log('yoyo', error);
    
    return {
      success: false,
      message: `Error -h: ${error.message}`
    }
  }

  
  return {
    success: true,
    message: "Welcome, seeker of wisdom! Your scroll shall arrive with the next moon's tide."
  }
}

