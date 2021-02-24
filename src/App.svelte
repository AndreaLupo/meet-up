<script>
import MeetupGrid from './Meetups/MeetupGrid.svelte';
import Header from './UI/Header.svelte';
import TextInput from './UI/TextInput.svelte';
import Button from './UI/Button.svelte';

let title = '';
let subtitle = '';
let address = '';
let email = '';
let imageUrl = '';
let description = '';

let meetups = [
    {
        id: 'm1',
        title: 'Coding Bootcamp',
        subtitle: 'Learn to code in 2 hours',
        description: 'In this meetup we will have some experts that teach you how to code',
        imageUrl: 'https://ubiqum.com/assets/uploads/2019/07/coding-bootcamp-amsterdam.jpg',
        address: '27th Nerd Road, 32523 New York',
        contactEmail: 'code@test.com'
    },
    {
        id: 'm2',
        title: 'Swim Together',
        subtitle: 'Let\'s go for some swimming',
        description: 'We will simply swim some rounds!',
        imageUrl: 'http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcReCQhGt8kpE7bzFk4E-y8OgJa9LB2IKwrjuK3I9Xs9Fa2GrWlovNPYsxzqk-cmXODcnhIGJ-Cq6GJ5Qvi8k_c',
        address: '27th Nerd Road, 32523 New York',
        contactEmail: 'code@test.com'
    }
];

function addMeetup() {
    // keys has to be equal to MeetupItem variables
    const meetUp = {
        id: Math.random().toString(),
        title: title,
        subtitle: subtitle,
        description: description,
        address: address,
        email, email,
        imageUrl: imageUrl
    };

    // add at the start of the array
    meetups = [meetUp, ...meetups];
}
</script>

<Header/>

<main>

    <form on:submit|preventDefault={addMeetup}>
        <TextInput id="title" 
            label="Title" 
            value={title} 
            on:input={event => (title = event.target.value)}/>

        <TextInput id="subtitle" 
            label="Subtitle" 
            value={subtitle} 
            on:input={event => (subtitle = event.target.value)}/>

        <TextInput id="address" 
            label="Address" 
            value={address} 
            on:input={event => (address = event.target.value)}/>
        
        <TextInput id="imageUrl" 
            label="Image url" 
            value={imageUrl} 
            on:input={event => (imageUrl = event.target.value)}/>

        <TextInput id="email" 
            label="Email" 
            value={email} 
            type="email"
            on:input={event => (email = event.target.value)}/>
       
        <TextInput id="description" 
            label="Description" 
            value={description} 
            type="textarea"
            rows="3"
            on:input={event => (description = event.target.value)}/>

       
        <Button type="submit" caption="Save"/>
    </form>


    <MeetupGrid {meetups}></MeetupGrid>
</main>

<style>
    main {
        margin-top: 4rem;
    }

    form {
        width: 30rem;
        max-width: 90%;
        margin: auto;
    }
</style>