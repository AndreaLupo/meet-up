<script>
    import MeetupItem from './MeetupItem.svelte';
    import MeetupFilter from './MeetupFilter.svelte';
    import Button from '../UI/Button.svelte';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let meetups;
    let favOnly = false;
    let editMode = false;

    $:filteredMeetups = favOnly ? meetups.filter(m => m.isFavourite) : meetups;

    function setFilter(event) {
        // the event contains if you click all or other
        favOnly = event.detail === 1;
    }
</script>

<section id="meetupControls">
    <MeetupFilter on:select={setFilter}/>
    <Button on:click={() => dispatch('add')}>
        New meetup
    </Button>
</section>

<section id="meetups">
    {#each filteredMeetups as meetup}
        <MeetupItem id={meetup.id} title={meetup.title} 
            subtitle={meetup.subtitle}
            description={meetup.description} imageUrl={meetup.imageUrl}
            email={meetup.contactEmail} address={meetup.address}
            isFav={meetup.isFavourite}
            on:showdetails on:edit/>
    {/each}
</section>

<style>
    #meetupControls {
        margin: 1rem;
        display: flex;
        justify-content: space-between;
    }

    #meetups {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 1rem;
    }

    @media (min-width: 768px) {
        #meetups {
            grid-template-columns: repeat(2, 1fr);
        }
    }

</style>