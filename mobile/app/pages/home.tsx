import React from 'react';

import { StyledText, StyledView } from '../components/styled';
import { useNotifications } from '../notifications';


export default function Home() {

	const {expoPushToken, notification} = useNotifications();

	return (
		<StyledView className='w-full h-full flex flex-col items-center justify-evenly'>
      <StyledText className='text-silver'>Your expo push token: {expoPushToken}</StyledText>
      <StyledView className='h-fit flex flex-col items-center justify-center'>
        <StyledText className='text-silver'>Title: {notification && notification.request.content.title} </StyledText>
        <StyledText className='text-silver'>Body: {notification && notification.request.content.body}</StyledText>
        <StyledText className='text-silver'>Data: {notification && JSON.stringify(notification.request.content.data)}</StyledText>
      </StyledView>
    </StyledView>
	);
}
