<script>
import MeetupGrid from './Meetups/MeetupGrid.svelte';
import Header from './UI/Header.svelte';
import TextInput from './UI/TextInput.svelte';
import Button from './UI/Button.svelte';
import EditMeetup from './Meetups/EditMeetup.svelte';
import meetupsStore from './Meetups/meetups-store';

let editMode = null;

function addMeetup(event) {
    // event is the object emitted inside the editMeetup component
    // keys has to be equal to MeetupItem variables
    const meetUp = {
        title: event.detail.title,
        subtitle: event.detail.subtitle,
        description: event.detail.description,
        address: event.detail.address,
        email: event.detail.email,
        imageUrl: event.detail.imageUrl
    };

    meetupsStore.fuck();
    meetupsStore.addMeetup(meetUp);

    editMode = null;
}

function toggleFavourite(event) {
    const id = event.detail;
    
    meetupsStore.toggleFavourite(id);
}

function cancelEdit() {
    editMode = null;
    
}

</script>

<Header/>

<main>
    <div class="meetup-controls">

    </div>
    <Button on:click={() => editMode = 'add'}>
        New meetup
    </Button>

    {#if editMode == 'add'}
        <EditMeetup on:save={addMeetup} on:cancel={cancelEdit}/>
    {/if}

    <MeetupGrid meetups={$meetupsStore}
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