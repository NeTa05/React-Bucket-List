export function dateFromString(deadline) {
	deadline = deadline.split('/')
    let month = deadline[0]-1 //month starts at 0 not 1
    let day = deadline[1]
    return new Date(deadline[2], month , day ); 
}