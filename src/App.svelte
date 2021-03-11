<script>
import MeetupGrid from './Meetups/MeetupGrid.svelte';
import Header from './UI/Header.svelte';
import TextInput from './UI/TextInput.svelte';
import Button from './UI/Button.svelte';
import EditMeetup from './Meetups/EditMeetup.svelte';
import MeetupDetail from './Meetups/MeetupDetail.svelte';
import meetupsStore from './Meetups/meetups-store';

let editMode = null;
let editedId;

let page = 'overview';
let pagedata = {};

function saveMeetup(event) {
    // event is the object emitted inside the editMeetup component
    // keys has to be equal to MeetupItem variables
    
    editMode = null;
    editedId = null;
}

function cancelEdit() {
    editMode = null;
    editedId = null;
}

function showDetails(event) {
    page = 'details';
    pagedata.id = event.detail;
}

function closeDetails(event) {
    page = 'overview';
    pagedata = {};
}

function startEdit(event) {
    editMode = 'edit';
    editedId = event.detail; 
}

</script>

<Header/>

<main>
{#if page == 'overview'}
    <div class="meetup-controls">
        <Button on:click={() => editMode = 'edit'}>
            New meetup
        </Button>
    </div>
    
    {#if editMode == 'edit'}
        <EditMeetup id={editedId} on:save={saveMeetup} on:cancel={cancelEdit}/>
    {/if}

    <MeetupGrid meetups={$meetupsStore} on:showdetails={showDetails}
        on:edit={startEdit}></MeetupGrid>
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