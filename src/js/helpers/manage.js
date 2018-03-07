 
 export function findLastId(){
	const tasks = JSON.parse(window.localStorage.getItem('tasks'))
	let maxId = 0
	tasks.forEach(function (task) {
	  if (task.id > maxId) {
	    maxId = task.id
	  }
	})
	maxId++
	return maxId
}


export function getNextYear() {
	let nextYear = new Date(new Date().setFullYear(new Date().getFullYear() + 1))
	return nextYear.getMonth() + 1 + '/' + nextYear.getDate() + '/' + nextYear.getFullYear()
}
