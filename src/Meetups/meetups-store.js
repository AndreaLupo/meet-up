import {writable} from 'svelte/store';

// default values
const meetups = writable([
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
]) ;

const customMeetupStore = {
    subscribe: meetups.subscribe,
    fuck: function() {
        console.log('Fuck');
    },
    addMeetup: meetupData => {
        const newMeetup = {
            ...meetupData,
            id: Math.random().toString(),
            isFavourite: false
        };
        meetups.update(items => {
            return [newMeetup, ...items];
        });
    },
    toggleFavourite: id => {
        meetups.update(items => {
            // get the element with the requested id as a new object, not a reference type!
            const updatedMeetup = {... items.find( meetup => meetup.id === id) };
            updatedMeetup.isFavourite = !updatedMeetup.isFavourite;
            
            const meetupIndex = items.findIndex(m => m.id === id);
            const updatedMeetups = [...items];

            // modify the copied array with the updated element
            updatedMeetups[meetupIndex] = updatedMeetup;

            // override the array with the new array
            return updatedMeetups;
        });
    }
}

export default customMeetupStore;