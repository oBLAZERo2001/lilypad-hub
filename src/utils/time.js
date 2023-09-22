export function getTimeDifference(targetTimestamp) {
	const targetDate = new Date(targetTimestamp);
	const currentDate = new Date();

	const timeDifferenceInSeconds = Math.floor((currentDate - targetDate) / 1000);

	if (timeDifferenceInSeconds < 60) {
		return `${timeDifferenceInSeconds} sec ago`;
	} else if (timeDifferenceInSeconds < 3600) {
		const minutes = Math.floor(timeDifferenceInSeconds / 60);
		return `${minutes} min ago`;
	} else if (timeDifferenceInSeconds < 86400) {
		const hours = Math.floor(timeDifferenceInSeconds / 3600);
		return `${hours} hr ago`;
	} else {
		const days = Math.floor(timeDifferenceInSeconds / 86400);
		return `created ${days} days ago`;
	}
}
