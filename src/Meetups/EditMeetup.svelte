<script>
    import TextInput from '../UI/TextInput.svelte';
    import {createEventDispatcher} from 'svelte';
    import Modal from '../UI/Modal.svelte';
    import Button from '../UI/Button.svelte';
    import { isEmpty, isValidEmail } from '../helpers/validation';

    let title = '';
    let titleValid = false;
    let subtitle = '';
    let subtitleValid = false;
    let address = '';
    let addressValid = false;
    let email = '';
    let emailValid = false;
    let imageUrl = '';
    let imageUrlValid = false;
    let description = '';
    let descriptionValid = false;

    const dispatch = createEventDispatcher();

    /* every time the value of the field title change, call the function isEmpty and define 
    if the title is valid or not */
    $:titleValid = !isEmpty(title);
    $:subtitleValid = !isEmpty(subtitle);
    $:addressValid = !isEmpty(subtitle);
    $:descriptionValid = !isEmpty(description);
    $:imageUrlValid = !isEmpty(imageUrl);
    $:emailValid = isValidEmail(email);


    function submitForm() {
        dispatch('save', {
            title: title,
            subtitle: subtitle,
            address: address,
            email: email, 
            description: description,
            imageUrl: imageUrl
        });
    }

    function cancel() {
        dispatch('cancel');
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
            type="email"
            valid={emailValid}
            validityMessage="Please enter a valid email address"
            on:input={event => (email = event.target.value)}/>
    
        <TextInput id="description" 
            label="Description" 
            value={description} 
            type="textarea"
            rows="3"
            valid={descriptionValid}
            validityMessage="Please enter a valid description"
            on:input={event => (description = event.target.value)}/>        
    </form>
    <div slot="footer">
        <Button type="button" mode="outline" on:click={cancel}>Cancel</Button>
        <Button type="button" on:click={submitForm}>Save</Button>
    </div> 
</Modal>
<style>
    form {
        max-width: 100%;
    }
</style>