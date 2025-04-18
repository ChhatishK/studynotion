export function GetAvgRating(rating) {
    if (rating?.length === 0) return 0;

    const totalReviewCount = rating?.reduce((acc, curr) => {
        acc += curr.rating
        return acc;
    }, 0);

    const multiplier = Math.pow(10, 1);
    const avgReviewCount = 
    Math.round((totalReviewCount / rating?.length) * multiplier) / multiplier

    return avgReviewCount;
}