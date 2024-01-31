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
			<button class="submit-button" @click="findSimilarities">Submit</button>
		</div>

		<div class="input-form" style="display:block; text-align:center;">
			<div>
				<!-- <h2 style="display: inline; margin-bottom: 20px; margin-right: 20px;">Similarities</h2> -->
				<h2 style="display: inline; margin-bottom: 20px; margin-right: 20px;">Similarity Score: <span id="scoreValue">{{ score }}</span>%</h2>
			</div>
			<textarea class="text-area" id="similarities" v-model="similaritiesText" readonly></textarea>
		</div>

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
			inputText: '',
			outputText: '',
			description: '',
			similaritiesText: '',
			score: 0,
		};
	},
	methods: {
		submitText() {
			console.log("Submit button clicked. Input text:", this.inputText); // Debugging log
			this.outputText = this.inputText;
		},
		findSimilarities() {
			console.log("Job Description button clicked. Input text:", this.description); // Debugging log
			const outputWords = new Set(this.outputText.toLowerCase().split(/\s+/)); // Split the words into a set
			const descriptionWords = new Set(this.description.toLowerCase().split(/\s+/)); // ignoring white space and spacing
			const jobWordCount = descriptionWords.size;
			let percentage = 0;

			let similarities = []; // create an empty array
			for (let words of outputWords) {
				if (descriptionWords.has(words)) {
					similarities.push(words);
				}
			}

			percentage = (similarities.length / jobWordCount) * 100;

			this.similaritiesText = similarities.join(', ');
			this.score = percentage.toFixed(1);
		}

	}
};
</script>

<style>
h2 {
	font-size: 20px;
	font-weight: bold;
}

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

/* Will apply to the whole webpage */
body {
	background: linear-gradient(to right, rgb(182, 244, 146), rgb(51, 139, 147));
	background-repeat: no-repeat;
	background-attachment: fixed;
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
