const EA = document.getElementById('indonesia');

EA.addEventListener('mouseover', () => {
	EA.style.fill = 'green';
	EA.style.transition = '600ms ease all'
	EA.style.filter = 'none'
	EA.style.strokeWidth = '2.5px';
	EA.style.strokeOpacity = '2';
})

EA.addEventListener('mouseout', () => {
	EA.style.fill = 'floralwhite';
	EA.style.filter = 'url(#filter12951)';
	EA.style.strokeWidth = '1.2px';
	EA.style.strokeOpacity = '.58527';
})