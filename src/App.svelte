<script>
    import MeetupItem from './Meetups/MeetupItem.svelte';
import Header from './UI/Header.svelte';

    const meetups = [
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
    ]
</script>

<Header/>

<section id="meetups">
    {#each meetups as meetup}
        <MeetupItem title={meetup.title} subtitle={meetup.subtitle}
            description={meetup.description} imageUrl={meetup.imageUrl}
            email={meetup.contactEmail} address={meetup.address}/>
    {/each}
</section>

<style>
    #meetups {
        margin-top: 4rem;
    }
</style>