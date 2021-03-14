<script>
import MeetupGrid from './Meetups/MeetupGrid.svelte';
import Header from './UI/Header.svelte';
import TextInput from './UI/TextInput.svelte';
import Button from './UI/Button.svelte';
import EditMeetup from './Meetups/EditMeetup.svelte';
import MeetupDetail from './Meetups/MeetupDetail.svelte';
import meetupsStore from './Meetups/meetups-store';
import LoadingSpinner from './UI/LoadingSpinner.svelte';

let editMode = null;
let editedId;
let isLoading = true;

let page = 'overview';
let pagedata = {};

fetch('https://svelte-course-a2f4f-default-rtdb.firebaseio.com/meetups.json')
.then(res => {
    if(!res.ok) {
        throw new Error('Error');
    }
    return res.json();
})
.then(data => {
    const loadedMeetups = [];
    for(const key in data) {
        // not in the markup - push ok!
        // add the key to the object itself
        loadedMeetups.push({...data[key], id: key});
    }

    // dummy wait of data
    setTimeout(() => {
        // override current meetups
        isLoading = false;
        meetupsStore.setMeetups(loadedMeetups);
    }, 1000);

    
})
.catch(err => {

});

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
    
    {#if editMode == 'edit'}
        <EditMeetup id={editedId} on:save={saveMeetup} on:cancel={cancelEdit}/>
    {/if}

    {#if isLoading}
        <LoadingSpinner/>        
    {:else}
         <!-- content here -->
         <MeetupGrid meetups={$meetupsStore} 
        on:showdetails={showDetails}
        on:edit={startEdit}
        on:add={() => editMode = 'edit'}
        ></MeetupGrid>
    {/if}
    
{:else}
    <MeetupDetail id={pagedata.id} on:close={closeDetails}/>
{/if}  
</main>

<style>
    main {
        margin-top: 4rem;
    }

</style>