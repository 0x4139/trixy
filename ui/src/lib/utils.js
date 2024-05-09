export function setPageTitle(title) {
    document.title = `TRIXY | ${title}`;
}

export function formatNumberWithK(number) {
    const abs = Math.abs(number);
    if (abs >= 1.0e6) {
        return (abs / 1.0e6).toFixed(1) + "m";
    } else if (abs >= 1.0e3) {
        return (abs / 1.0e3).toFixed(1) + "k";
    } else {
        return number;
    }
}

export function formatPercentageChange(number) {
    if (number > 0) {
        return `${number.toFixed(1)}% more than`;
    } else if (number < 0) {
        return `${Math.abs(number).toFixed(1)}% less than`;
    } else {
        return "same as";
    }
}

export function getChartColorsArray(appVariables, array) {
    let result = [];
    for (let i = 0; i < array.length; i++) {
        const value = array[i] > 1 ? array[i] / 100 : array[i];
        result.push(`rgba(${appVariables.color.themeRgb}, ${value})`);
    }
    return result;
}

export function insertChevronIconBasedOnValue(number) {
    if (number > 0) {
        return "fa fa-chevron-up fa-fw me-1";
    } else if (number < 0) {
        return "fa fa-chevron-down fa-fw me-1";
    } else {
        return "";
    }
}
