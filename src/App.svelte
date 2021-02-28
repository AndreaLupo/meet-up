<script>
import MeetupGrid from './Meetups/MeetupGrid.svelte';
import Header from './UI/Header.svelte';
import TextInput from './UI/TextInput.svelte';
import Button from './UI/Button.svelte';
import EditMeetup from './Meetups/EditMeetup.svelte';

let title = '';
let subtitle = '';
let address = '';
let email = '';
let imageUrl = '';
let description = '';

let editMode = null;

let meetups = [
    {
        id: 'm1',
        title: 'Coding Bootcamp',
        subtitle: 'Learn to code in 2 hours',
        description: 'In this meetup we will have some experts that teach you how to code',
        imageUrl: 'https://ubiqum.com/assets/uploads/2019/07/coding-bootcamp-amsterdam.jpg',
        address: '27th Nerd Road, 32523 New York',
        contactEmail: 'code@test.com',
        isFavourite: false
    },
    {
        id: 'm2',
        title: 'Swim Together',
        subtitle: 'Let\'s go for some swimming',
        description: 'We will simply swim some rounds!',
        imageUrl: 'http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcReCQhGt8kpE7bzFk4E-y8OgJa9LB2IKwrjuK3I9Xs9Fa2GrWlovNPYsxzqk-cmXODcnhIGJ-Cq6GJ5Qvi8k_c',
        address: '27th Nerd Road, 32523 New York',
        contactEmail: 'code@test.com',
        isFavourite: false
    }
];

function addMeetup(event) {
    // event is the object emitted inside the editMeetup component
    // keys has to be equal to MeetupItem variables
    const meetUp = {
        id: Math.random().toString(),
        title: event.detail.title,
        subtitle: event.detail.subtitle,
        description: event.detail.description,
        address: event.detail.address,
        email: event.detail.email,
        imageUrl: event.detail.imageUrl
    };

    // add at the start of the array
    meetups = [meetUp, ...meetups];

    editMode = null;
}

function toggleFavourite(event) {
    const id = event.detail;
    
    // get the element with the requested id as a new object, not a reference type!
    const updatedMeetup = {... meetups.find( meetup => meetup.id === id) };
    updatedMeetup.isFavourite = !updatedMeetup.isFavourite;
    
    const meetupIndex = meetups.findIndex(m => m.id === id);
    const updatedMeetups = [...meetups];

    // modify the copied array with the updated element
    updatedMeetups[meetupIndex] = updatedMeetup;

    // override the array with the new array
    meetups = updatedMeetups;
}

</script>

<Header/>

<main>
    <div class="meetup-controls">

    </div>
    <Button caption="New meetup" on:click={() => editMode = 'add'}/>

    {#if editMode == 'add'}
        <EditMeetup on:save={addMeetup}/>
    {/if}

    <MeetupGrid {meetups}
            on:toggle-favourite={toggleFavourite}></MeetupGrid>
    
</main>

<style>
    main {
        margin-top: 4rem;
    }

    .meetup-controls {
        margin: 1rem;
    }
</style>