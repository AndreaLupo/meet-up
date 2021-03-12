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
    let email = '';
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
            email = selectedMeetup.contactEmail;
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
    $:emailValid = isValidEmail(email);
    $:formIsValid = titleValid && subtitleValid && addressValid && descriptionValid && imageUrlValid
                    && emailValid;

    function submitForm() {
        const meetUp = {
            title: title,
            subtitle: subtitle,
            description: description,
            address: address,
            email: email,
            imageUrl: imageUrl
        };

        if(id) {
            meetupsStore.updateMeetup(id, meetUp);
        }
        else {
            meetupsStore.addMeetup(meetUp);
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
            value={email} 
            controlType="email"
            valid={emailValid}
            validityMessage="Please enter a valid email address"
            on:input={event => (email = event.target.value)}/>
    
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