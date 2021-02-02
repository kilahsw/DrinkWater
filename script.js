const smallCups = document.querySelectorAll('.cup-small');

const liters = document.getElementById('liters');
const percentage = document.getElementById('percentage');
const remained = document.getElementById('remained');

updateBigCup(); //call the function on page load

//idx is the cups indexes, 8 cups so 0-7
//arrow function does not need {} for a single level
smallCups.forEach((cup, idx) => {
	// console.log(idx);
	cup.addEventListener('click', () => highlightCups(idx)); //on click activate the highlightCups function
});

function highlightCups(idx) {
	console.log(idx); //when u click on a cup, shows cup's index

	//when you click on a cup that's full, and the one next to it is not full, it will empty that cup. Will also empty the filled cup in postion [0]

	if (
		smallCups[idx].classList.contains('full') &&
		!smallCups[idx].nextElementSibling.classList.contains('full')
	) {
		idx--;
	}
	//want to click on a cup and have it fill AND if click on a cup with cups in front of it, all the cups leading up to it also fill
	smallCups.forEach((cup, idx2) => {
		if (idx2 <= idx) {
			cup.classList.add('full');
		} else {
			cup.classList.remove('full');
		}
	});

	updateBigCup(); //call when a small cup is clicked
}

//query selector for classes
function updateBigCup() {
	const fullCups = document.querySelectorAll('.cup-small.full').length;
	// console.log(fullCups); //shows # of full cups when clicked

	const totalCups = smallCups.length;
	console.log(totalCups);

	//if all smallcups are empty, do not show a percentage
	if (fullCups === 0) {
		percentage.style.visibility = 'hidden';
		percentage.style.height = 0;
	} else {
		percentage.style.visibility = 'visible';

		//fill big cup according to how many small cups are full
		percentage.style.height = `${(fullCups / totalCups) * 330}px`;
		//show percentage as it fills big cup
		percentage.innerText = `${(fullCups / totalCups) * 100}%`;
    }
    
    //remove the 'remained' text when big cup is full
	if (fullCups === totalCups) {
		remained.style.visibility = 'hidden';
		remained.style.height = 0;
	} else {
        remained.style.visibility = 'visible'

        //bring in number value of remaining liters
        liters.innerText = `${2 - (250 * fullCups / 1000)}L`
    }
}
