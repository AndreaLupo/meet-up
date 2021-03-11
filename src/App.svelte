<script>
import MeetupGrid from './Meetups/MeetupGrid.svelte';
import Header from './UI/Header.svelte';
import TextInput from './UI/TextInput.svelte';
import Button from './UI/Button.svelte';
import EditMeetup from './Meetups/EditMeetup.svelte';
import MeetupDetail from './Meetups/MeetupDetail.svelte';
import meetupsStore from './Meetups/meetups-store';

let editMode = null;

let page = 'overview';
let pagedata = {};

function addMeetup(event) {
    // event is the object emitted inside the editMeetup component
    // keys has to be equal to MeetupItem variables
    
    editMode = null;
}

function cancelEdit() {
    editMode = null;
    
}

function showDetails(event) {
    page = 'details';
    pagedata.id = event.detail;
}

function closeDetails(event) {
    page = 'overview';
    pagedata = {};
}

</script>

<Header/>

<main>
{#if page == 'overview'}
    <div class="meetup-controls">
        <Button on:click={() => editMode = 'add'}>
            New meetup
        </Button>
    </div>
    
    {#if editMode == 'add'}
        <EditMeetup on:save={addMeetup} on:cancel={cancelEdit}/>
    {/if}

    <MeetupGrid meetups={$meetupsStore} on:showdetails={showDetails}></MeetupGrid>
{:else}
    <MeetupDetail id={pagedata.id} on:close={closeDetails}/>
{/if}  
</main>

<style>
    main {
        margin-top: 4rem;
    }

    .meetup-controls {
        margin: 1rem;
    }
</style>