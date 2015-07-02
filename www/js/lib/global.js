function textCounter(e, t, n) {
    if (e.value.length > n) {
        e.value = e.value.substring(0, n)
    } else {
        t.value = n - e.value.length
    }
}
