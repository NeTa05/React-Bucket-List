
export function getCurrentDate() {
	let currentDate = new Date(new Date().setFullYear(new Date().getFullYear()))
	return new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())
}

export function isADateBeforeToday(deadline) {
	let currentDate = getCurrentDate();
	deadline = deadline.split('/')
	let month = deadline[0]-1 //month starts at 0 not 1
	let day = deadline[1]
	let deadlineDate = new Date(deadline[2], month , day );                                                        
	return (currentDate > deadlineDate) 
}