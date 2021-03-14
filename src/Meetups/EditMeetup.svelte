<script>
    import TextInput from '../UI/TextInput.svelte';
    import {createEventDispatcher} from 'svelte';
    import Modal from '../UI/Modal.svelte';
    import Button from '../UI/Button.svelte';
    import { isEmpty, isValidEmail } from '../helpers/validation';
    import meetupsStore from './meetups-store';
    export let id = null;

    /* I can remove all the declaration of xValid variables, because they're created when
    the validation function is triggered, i.e. at the loading of the component */
    let title = '';
    let subtitle = '';
    let address = '';
    let contactEmail = '';
    let imageUrl = '';
    let description = '';

    /* Add the subscription to the store only if the id is set
    */
    if(id) {
        const unsubscribe = meetupsStore.subscribe(items => {
            const selectedMeetup = items.find(item => item.id === id);
            title = selectedMeetup.title;
            subtitle = selectedMeetup.subtitle;
            address = selectedMeetup.address;
            contactEmail = selectedMeetup.contactEmail;
            imageUrl = selectedMeetup.imageUrl;
            description = selectedMeetup.description;
        });

        unsubscribe();
    }
    


    const dispatch = createEventDispatcher();

    /* every time the value of the field title change, call the function isEmpty and define 
    if the title is valid or not */
    $:titleValid = !isEmpty(title);
    $:subtitleValid = !isEmpty(subtitle);
    $:addressValid = !isEmpty(subtitle);
    $:descriptionValid = !isEmpty(description);
    $:imageUrlValid = !isEmpty(imageUrl);
    $:emailValid = isValidEmail(contactEmail);
    $:formIsValid = titleValid && subtitleValid && addressValid && descriptionValid && imageUrlValid
                    && emailValid;

    function submitForm() {
        const meetUp = {
            title: title,
            subtitle: subtitle,
            description: description,
            address: address,
            contactEmail: contactEmail,
            imageUrl: imageUrl
        };

        if(id) {
            // remove the id key when updating!
            fetch(`https://svelte-course-a2f4f-default-rtdb.firebaseio.com/meetups/${id}.json`, {
                method: 'PATCH', // override only data provided - i.e. isFavourite is left as is
                body: JSON.stringify(meetUp),
                headers: {'Content-Type': 'application/json'}
            })
            .then(res => {
                if(!res.ok) {
                    throw new Error('Erroooor!');
                }
                meetupsStore.updateMeetup(id, meetUp);
            })
            .catch(err => {
                console.log(err);
            })
        }
        else {
            fetch('https://svelte-course-a2f4f-default-rtdb.firebaseio.com/meetups.json', {
                method: 'POST',
                body: JSON.stringify({ ...meetUp, isFavourite: false } ),
                headers: {'Content-Type': 'application/json'}
            }).then(res => {
                if(!res.ok) {
                    throw new Error('Error! Please try again');
                }
                return res.json();
            })
            .then(data => {
                //console.log(data);
                // data.name is the id given by firebase
                meetupsStore.addMeetup({...meetUp, isFavourite: false, id: data.name});
            })
            .catch(err => {
                console.log(err);
            });
        }
        

        // used to close the modal
        dispatch('save');
    }

    function cancel() {
        // used to close the modal
        dispatch('cancel');
    }

    function deleteMeetup() {
        meetupsStore.deleteMeetup(id);
        // close the modal
        dispatch('save');
    }
</script>

<Modal title="Edit meetup detail" on:cancel>
    <form on:submit|preventDefault={submitForm}>
        <TextInput id="title" 
            label="Title" 
            value={title} 
            valid={titleValid}
            validityMessage="Please enter a valid title"
            on:input={event => (title = event.target.value)}/>

        <TextInput id="subtitle" 
            label="Subtitle" 
            value={subtitle}
            valid={subtitleValid}
            validityMessage="Please enter a valid subtitle" 
            on:input={event => (subtitle = event.target.value)}/>

        <TextInput id="address" 
            label="Address" 
            value={address} 
            valid={addressValid}
            validityMessage="Please enter a valid address"
            on:input={event => (address = event.target.value)}/>
        
        <TextInput id="imageUrl" 
            label="Image url" 
            value={imageUrl}
            valid={imageUrlValid}
            validityMessage="Please enter a valid url" 
            on:input={event => (imageUrl = event.target.value)}/>

        <TextInput id="email" 
            label="Email" 
            value={contactEmail} 
            controlType="email"
            valid={emailValid}
            validityMessage="Please enter a valid email address"
            on:input={event => (contactEmail = event.target.value)}/>
    
        <TextInput id="description" 
            label="Description" 
            controlType="textarea"
            rows="3"
            valid={descriptionValid}
            validityMessage="Please enter a valid description"
            bind:value={description}/>        
    </form>
    <div slot="footer">
        <Button type="button" mode="outline" on:click={cancel}>Cancel</Button>
        <Button type="button" disabled={!formIsValid} on:click={submitForm}>Save</Button>
        {#if id}
            <Button on:click={deleteMeetup}>Delete</Button>
        {/if}
    </div> 
</Modal>
<style>
    form {
        max-width: 100%;
    }
</style>