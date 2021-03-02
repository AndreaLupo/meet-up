<script>
    import TextInput from '../UI/TextInput.svelte';
    import {createEventDispatcher} from 'svelte';
    import Modal from '../UI/Modal.svelte';
    import Button from '../UI/Button.svelte';

    let title = '';
    let subtitle = '';
    let address = '';
    let email = '';
    let imageUrl = '';
    let description = '';

    const dispatch = createEventDispatcher();

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
            valid={true}
            validityMessage="Please enter a valid title"
            on:input={event => (title = event.target.value)}/>

        <TextInput id="subtitle" 
            label="Subtitle" 
            value={subtitle} 
            on:input={event => (subtitle = event.target.value)}/>

        <TextInput id="address" 
            label="Address" 
            value={address} 
            on:input={event => (address = event.target.value)}/>
        
        <TextInput id="imageUrl" 
            label="Image url" 
            value={imageUrl} 
            on:input={event => (imageUrl = event.target.value)}/>

        <TextInput id="email" 
            label="Email" 
            value={email} 
            type="email"
            on:input={event => (email = event.target.value)}/>
    
        <TextInput id="description" 
            label="Description" 
            value={description} 
            type="textarea"
            rows="3"
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