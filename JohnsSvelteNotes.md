
# Svelte Notes

## Svelte Tutorial
First, if you are not familiar with Svelte and would like to, go check out the Svelte tutorial below. The tutorial starts with the most important elements of Svelte and trends towards less-important topics as it goes on.
 https://svelte.dev/tutorial/svelte/welcome-to-svelte
 
## Setup Instructions📝
- (Optional) Download Visual Studio Code if you don't have it already https://code.visualstudio.com/download
	- (Optional) Install the Svelte Visual Studio Code Plugin so your code will be displayed in pretty colors 😎
- Install Node js on your PC if you haven't already https://nodejs.org/en/download
- Fork the repo https://github.com/chiq2045/gradebook and then download the repo using your favorite Git GUI tool or command line if you are stuck in the 90s 🤪
- Open the repo in Visual Studio Code
	- If you are using the existing DB, create a file called ".env" in your gradebook repo folder and paste in the following: 
	```
	INSTANT_APP_ID=798718e1-f392-47a5-8b5c-28a6e1f9f5da
	INSTANT_APP_ADMIN_TOKEN=a42fee61-ffa8-425b-a3e1-35174f37a4ab
	```
- Install Node Modules
	- If the Terminal is not open in Visual Studio Code, open it by going to View -> Terminal
	- In the terminal type in ``` npm install ```
- Start the Application
	- In the terminal type in ``` npm run dev ```
	- In your browser navigate to http://localhost:5173/ and you should now see the gradebook website

## Troubleshooting Setup 😓🐜🐛
**Note:** I ran into a problem during my NPM Install where I got this error message on my Windows 10 machine 
>	npm : The term npm is not recognized as the name of a
> cmdlet, function, script file, or operable program. Check the spelling
> of the name, or if a path was included, verify that the path is
> correct and try again. At line:1 char:1 npm FullyQualifiedErrorId :
> CommandNotFoundException
> 
>These 2 links helped me to resolve it
>
> https://www.reddit.com/r/node/comments/1h6wer2/npm_not_working_on_windows_after_install_and/
>
> https://stackoverflow.com/questions/20992723/npm-is-not-recognized-as-internal-or-external-command-operable-program-or-bat

# Svelte Quick Reference Guide

##  Script and Styling
```javascript
 <script lang="ts"></script>
```
 and
```javascript
   <style></style>
```
  to insert js/ts code and also css styling into your .svelte file

## Imports
Imports happen in the script tag, and look like this: 
```javascript
import Nested from './Nested.svelte';
```
- The imported file need not define its exports (like in React)

## Storing state in a component
- ```let value = $state([1,2,3]) ``` or ```let value = $state(15)```
- ```$derived()``` allows you to derive an additional *readonly* value from current state values. Derive will auto-update your stored value when the state changes
- to log a value, you **cannot** log it directly, use the snapshot function as such: ```console.log($state.snapshot(numbers));```
	- ```$inspect()``` will automagically console.log a value for you also

##  $effect (onUpdate and onCreate)
- ``` $effect(() => { /* your code */})```
- ```$effect``` will run the function you pass it each time a re-render occurs **IF** it detects some sort of internal state
- Example of internal state: 
```javascript
	$effect(() => {
		/* the use of eggs will cause this to run on each update
		svelte is detecting a reference to a state variable called value here and infering it should run every update.*/
		let eggs = value;
		eggs+=1;
		console.log(new Date().toString());
	});
```
- Otherwise it will only run once when the component is created and 'mounts'
```javascript
	$effect(() => {
		console.log(new Date().toString());
	});
```
- Avoid using ```$effect``` if you can. It can easily lead to infinite loops if you attempt to update state within it and are not careful. If you modify a ```$state() ``` variable every update, each render requests another render leading to an infinite loop.
	
## Props 
Props can be generated as such: 
```javascript
	<script>
		let { answer } = $props();
	</script>
```
```answer``` will now hold the value of whatever is passed to the component like such: 
```javascript
	<Component answer={7} /> 
```
- Default Props by doing this: 
```javascript
	let { answer = 12 } = $props();
```
## Conditional Rendering
```javascript
	  {#if count > 10}
		<p>{count} is greater than 10</p>
	  {/if}
```
- You can also add an ```{:else}``` block before the ```{/if}``` to encapsulate an else condition.
	- "else if" is also an option:  ```{:else if count < 5} ```
	
## Loops
```javascript
	{#each colors as color, i}
		<button
			style="background: {color}"
			aria-label={color}
			aria-current={selected === color}
			onclick={() => selected = color}
		>{i + 1}</button>
	{/each}
```
- Always provide a key to a loop when you can to avoid strange state vs prop changes on subcomponents during a re-render
		- Example of a key provision: ```{#each colors as color (color.id)} ```
## Async Handling and Promises
```javascript
	{#await promise}
		<p>...rolling</p>
	{:then number}
		<p>you rolled a {number}!</p>
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}
```
## Binding inputs 
No need to intercept events, just use a bind on the value for text inputs and the like
```javascript
	<input bind:value={name} />
```
- Checkbox
	```javascript
		<input type="checkbox" bind:checked={yes}>
	```
- Numbers
	```javascript
		 <input type="range" bind:value={a} min="0" max="10" />
		 <input type="number" bind:value={a} min="0" max="10" /> 
	```
- Select (Combobox)
```javascript
		<select
			bind:value={selected}
			onchange={() => answer = ''}
		>
```
- Radiobutton and Checkboxes:
```javascript
		<input
			type="radio"
			name="scoops"
			value={number}
			bind:group={scoops} <- Number State Value
		/>
		<input
			type="checkbox"
			name="flavours"
			value={flavour}
			bind:group={flavours} <- String Array State Value
		/>
```
## Inline Styles
```javascript
<button
	class="card"
	style="transform: {flipped ? 'rotateY(0)' : ''}; --bg-1: palegoldenrod; --bg-2: black; --bg-3: goldenrod"
	onclick={() => flipped = !flipped}
>
```
```javascript
<button
	class="card"
	style:transform={flipped ? 'rotateY(0)' : ''}
	style:--bg-1="palegoldenrod"
	style:--bg-2="black"
	style:--bg-3="goldenrod"
	onclick={() => flipped = !flipped}
>
```

## Class Properties
```javascript
	class Box {
	
		#width = $state(0);
		
		get width() {
			return this.#width;
		}
		
		set width(value) {
			this.#width = value;
		}
	}
```
	

## Misc
- Use Svelte Built-Ins over js for some objects:
- Svelte ships with several reactive classes that you can use in place of JavaScript built-in objects — namely Map, Set, Date, URL and URLSearchParams.

- Snippets are super-light-weight components that allow you to reuse sections of HTML
	```javascript
	{#snippet row(d)}
		<div class="row">
			<span class="color" style="background-color: {d.hex}"></span>
			<span class="name">{d.name}</span>
			<span class="hex">{d.hex}</span>
			<span class="rgb">{d.rgb}</span>
			<span class="hsl">{d.hsl}</span>
		</div>
	{/snippet}
	{@render header()}
	```

- Global State Handling
	```javascript
		setContext('canvas', 'painting');
		getContext('canvas')
	```
	
- Routing can be found in the SvelteKit and follows project folder structure to deliver relevant components based on the current route
- 100% javascript files that do not have HTML integration use the file extension *.svelte.js