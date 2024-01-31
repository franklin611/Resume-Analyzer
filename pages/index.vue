<template>
	<div class="max-w-xl mx-auto text-black">
		<h1 class="my-8 text-5xl font-bold text-center text-black">Resume Analyzer</h1>

		<div class="input-form">
			<label for="inputText">Resume Text:</label>
			<input type="text" id="inputText" v-model="inputText">
			<button class="submit-button" id="submitButton" @click="submitText">Submit</button>
		</div>

		<div class="input-form">
			<textarea class="text-area" id="outputArea" v-model="outputText" readonly></textarea>
		</div>

		<div class="input-form">
			<label for="descriptionText">Job Description:</label>
			<input type="text" id="descriptionText" v-model="description">

			<button class="submit-button" @click="submitDescription">Submit</button>
		</div>

		<button class="submit-button" @click="submitToAI">Submit to AI</button>

		<div class="flex flex-col justify-center w-full my-4">
			<div class="flex items-center justify-center my-2">
				<span>Made with ♡ by Franklin Ramirez</span>

			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			inputText: '', // Assuming this is the actual resume text
			outputText: '',
			description: '',
			gptResponse: ''
		};
	},
	methods: {
		submitText() {
			console.log("Submit button clicked. Resume text:", this.inputText);
			// You can process the resumeText here as needed
			this.outputText = this.inputText;
		},
		async submitToAI() {
			try {
				const response = await fetch('/analyze', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						inputText: this.inputText,
						jobDescription: this.description
					})
				});

				if (!response.ok) throw new Error('Error in response');

				this.gptResponse = await response.text();
			} catch (error) {
				console.error(error);
				alert('Failed to get response from AI');
			}
		}
	}
};
</script>

<style>
.text-area {
	width: 100%;
	min-height: 200px;
	max-height: 500px;
}

.input-form {
	display: flex;
	align-items: center;
}

.input-form label {
	margin-right: 10px;
}

.input-container {
	display: flex;
	align-items: center;

}

.input-container input {
	margin-right: 10px;

}

.input-form {
	margin: 20px;
	padding: 10px;

}

.input-form input[type="text"] {
	width: 100%;
	padding: 10px;
	margin: 10px 0;
	display: inline-block;
	border: 1px solid #ccc;
	border-radius: 4px;
	box-sizing: border-box;
}

.input-form label {
	font-weight: bold;
}

.submit-button {
	background-color: #4CAF50;
	color: white;
	padding: 12px 20px;
	border: none;
	border-radius: 4px;
	cursor: pointer;
}

.submit-button:hover {
	background-color: #45a049;
}


.loader {
	width: 12px;
	height: 12px;
	border-radius: 50%;
	display: block;
	position: relative;
	color: #d3d3d3;
	box-sizing: border-box;
	animation: animloader 2s linear infinite;
}

@keyframes animloader {
	0% {
		box-shadow: 14px 0 0 -2px, 38px 0 0 -2px, -14px 0 0 -2px, -38px 0 0 -2px;
	}

	25% {
		box-shadow: 14px 0 0 -2px, 38px 0 0 -2px, -14px 0 0 -2px, -38px 0 0 2px;
	}

	50% {
		box-shadow: 14px 0 0 -2px, 38px 0 0 -2px, -14px 0 0 2px, -38px 0 0 -2px;
	}

	75% {
		box-shadow: 14px 0 0 2px, 38px 0 0 -2px;
	}
}
</style>
