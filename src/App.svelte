<script>
import MeetupGrid from './Meetups/MeetupGrid.svelte';
import Header from './UI/Header.svelte';

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
        <div class="form-control">
            <label for="title">Title</label>
            <input id="title" type="text" bind:value={title}>
        </div>
        <div class="form-control">
            <label for="subtitle">Subtitle</label>
            <input id="subtitle" type="text" bind:value={subtitle}>
        </div>
        <div class="form-control">
            <label for="address">Address</label>
            <input id="address" type="text" bind:value={address}>
        </div>
        <div class="form-control">
            <label for="imageUrl">Image url</label>
            <input id="imageUrl" type="text" bind:value={imageUrl}>
        </div>
        <div class="form-control">
            <label for="email">Email</label>
            <input id="email" type="email" bind:value={email}>
        </div>
        <div class="form-control">
            <label for="description">Description</label>
            <textarea id="description" rows="3" bind:value={description}/>
        </div>

        <button type="submit">Save</button>
    </form>


    <MeetupGrid {meetups}></MeetupGrid>
</main>

<style>
    main {
        margin-top: 4rem;
    }
</style>