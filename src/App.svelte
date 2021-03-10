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
    
    editMode = null;
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

    <MeetupGrid meetups={$meetupsStore}></MeetupGrid>
    
</main>

<style>
    main {
        margin-top: 4rem;
    }

    .meetup-controls {
        margin: 1rem;
    }
</style>