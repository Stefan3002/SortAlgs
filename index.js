function draw(nums){
    const area = document.querySelector("#area")
    area.innerHTML = ''
    nums.forEach((num, index) => {
        area.appendChild(num)
    })
}

async function swap(x,y,nums){
    let aux = nums[x]
    nums[x] = nums[y]
    nums[y] = aux

    await new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, speed)
    })

}
async function animateSelected(x, nums){
    let sign = -1
    Math.random() <= .5 ? sign = -1 : sign = 1
    gsap.to(nums[x], {duration: speed / 1000 / 3, x: sign * 150  + '%', ease: 'power2'})
    // gsap.to(nums[j], {duration: speed / 1000 / 3, x: sign * 150  + '%', ease: 'power2'})
    return new Promise(resolve => {
        setTimeout(() => {
           resolve(speed / 1000 / 3)
        }, speed)
    })
}
async function animateSelectedHelper(x, nums){
    gsap.to(nums[x], {duration: speed / 1000 / 3, x: 0, ease: 'power2'})

    return new Promise(resolve => {
        setTimeout(() => {
            resolve(speed / 1000 / 3)
        }, speed)
    })
}
function animateChange(i, j, nums){


    gsap.to(nums[i], {
        duration: speed / 1000 / 3,
        y: 100 * (j - i) + MARGINITEM + '%',
        delay: speed / 1000 / 3,
        ease: 'power2'
    })
    gsap.to(nums[j], {
        duration: speed / 1000 / 3,
        y: -100 * ((j) - i) - MARGINITEM + '%',
        delay: speed / 1000 / 3,
        ease: 'power2'
    })

    gsap.to(nums[i], {duration: speed / 1000 / 3, x: '0', delay: speed / 1000 / 3 * 2, ease: 'bounce'})
    gsap.to(nums[j], {duration: speed / 1000 / 3, x: '0', delay: speed / 1000 / 3 * 2, ease: 'bounce'})

}
function animateChangeHelper(i, j, nums){
    gsap.to(nums[i], {duration: 0, y: '0', ease: 'power2'})
    gsap.to(nums[j], {duration: 0, y: '0', ease: 'power2'})
}
async function selectionSort(nums) {
    for(let i = 0; i < nums.length - 1; i++) {
        let ind = i;
        let maximum = parseInt(nums[i].textContent)
        for (let j = i + 1; j < nums.length; j++) {
            if (parseInt(nums[j].textContent) > maximum) {
                maximum = parseInt(nums[j].textContent);
                ind = j;
            }

        }
        animateSelected(i, nums)
        await animateSelected(ind, nums)
        animateChange(i, ind, nums);
        await swap(i, ind, nums);
        draw(nums)
        animateChangeHelper(i, ind, nums);
    }
}
async function selectionSortEducational(nums) {
    for(let i = 0; i < nums.length - 1; i++) {
        await animateSelected(i, nums)
        let ind = i;
        let maximum = parseInt(nums[i].textContent)
        for (let j = i + 1; j < nums.length; j++) {
            // nums[j].textContent = "Maximum: "
            nums[i].style.border = "5px solid red"
            await animateSelected(j, nums)
            if (parseInt(nums[j].textContent) > maximum) {
                if(ind !== i) {
                    nums[ind].style.border = "0"
                    await animateSelectedHelper(ind, nums)
                }
                nums[j].style.border = "3px solid black"
                maximum = parseInt(nums[j].textContent);
                ind = j;
                //Current maximum
            }
            else {
                await animateSelectedHelper(j, nums)
            }
        }
        animateChange(i, ind, nums);
        await swap(i, ind, nums);
        draw(nums)
        animateChangeHelper(i, ind, nums);
        nums[ind].style.border = "0"
        nums[i].style.border = "0"

    }
}
async function bubble(nums){
    let k
    do{
        k = 0
        for(let i = 0; i < nums.length - 1; i++) {
            // nums[i].classList.add("chosen")
            // nums[i + 1].classList.add("chosen")
            if (parseInt(nums[i].textContent) < parseInt(nums[i + 1].textContent)) {
                animateSelected(i, nums)
                await animateSelected(i + 1, nums)
                animateChange(i, i + 1, nums)

                await swap(i, i + 1, nums)
                nums[i].classList.remove("chosen")
                nums[i + 1].classList.remove("chosen")
                k = 1
                draw(nums)

                animateChangeHelper(i, i + 1, nums)
            }
            // nums[i].classList.remove("chosen")
            // nums[i + 1].classList.remove("chosen")
        }
    }while(k)
}



async function divide(i,j,nums){
    let ii = 0
    let jj = -1
    while(i < j){
        if(parseInt(nums[i].textContent) < parseInt(nums[j].textContent)){
            animateSelected(i, nums)
            await animateSelected(j, nums)
            animateChange(i, j, nums)
            await swap(i, j, nums);
            let aux= ii
            ii = -jj
            jj = -aux
            draw(nums)
            animateChangeHelper(i, j, nums)
        }
        i += ii
        j += jj
    }

    return i
}
async function quickSort(left,right,nums){
    if(left < right){
        let pivot = await divide(left,right,nums)
        // nums[pivot].classList.add('outline')
           await quickSort(left, pivot, nums)
           await quickSort(pivot + 1, right, nums)
            // await Promise.all([p1,p2])
    }
}

async function divideEducational(i,j,nums){
    let ii = 0
    let jj = -1
    while(i < j){
        if(parseInt(nums[i].textContent) < parseInt(nums[j].textContent)){
            animateSelected(i, nums)
            await animateSelected(j, nums)
            animateChange(i, j, nums)
            await swap(i, j, nums);
            let aux= ii
            ii = -jj
            jj = -aux
            draw(nums)
            animateChangeHelper(i, j, nums)
        }
        i += ii
        j += jj
    }
    nums[i].style.border = "3px solid black"
    return i
}
async function quickSortEducational(left,right,nums){
    if(left < right){
        let pivot = await divideEducational(left,right,nums)

        // nums[pivot].classList.add('outline')
        await quickSortEducational(left, pivot, nums)
        nums[pivot].style.border = "0"
        await quickSortEducational(pivot + 1, right, nums)
        nums[pivot].style.border = "0"
        // await Promise.all([p1,p2])
    }
}
async function percolate(nums,n,i){
    let target = i
    const l = i * 2 + 1
    const r = l + 1
    if(l < n && parseInt(nums[l].textContent) < parseInt(nums[i].textContent))
        target = l
    if(r < n && parseInt(nums[r].textContent) < parseInt(nums[target].textContent))
        target = r
    if(target !== i){
        animateSelected(i, nums)
        await animateSelected(target, nums)
        animateChange(i, target, nums)
        await swap(i, target, nums);

        draw(nums)
        animateChangeHelper(i, target, nums)

        await percolate(nums, n, target)
    }
}
async function heapSort(nums){
    let n = nums.length
    for(let i = n / 2 - 1; i >= 0; i--)
        await percolate(nums, n, i);

    for(let i = n - 1; i >= 0; i--){

        animateSelected(i, nums)
        await animateSelected(0, nums)
        animateChange(i, 0, nums)
        await swap(i, 0, nums);

        draw(nums)
        animateChangeHelper(i, 0, nums)

        n--

        await percolate(nums,n,0)
    }

    console.log(nums)
}

function closeMenu(){
    document.querySelector(".head").classList.add("hidden")
    document.querySelector(".menu").classList.add("noDisplay")
    document.querySelector(".numsField").classList.add("noDisplay")
    document.querySelector(".title").classList.add("noDisplay")
    document.querySelector(".menuBtn").classList.add("rotateRight")
}

document.querySelector(".menuBtn").addEventListener("click", () => {
    if(document.querySelector(".head").classList.contains("hidden")) {
        document.querySelector(".head").classList.remove("hidden")
        document.querySelector(".menu").classList.remove("noDisplay")
        document.querySelector(".numsField").classList.remove("noDisplay")
        document.querySelector(".title").classList.remove("noDisplay")
        document.querySelector(".menuBtn").classList.remove("rotateRight")

    }
    else
        closeMenu()
})

const algos = document.querySelectorAll(".algButton")
const option = document.querySelectorAll(".optButton")
algos.forEach(alg => {
    alg.addEventListener("click", (e) => {
        const clicked = e.target
        clicked.classList.add("selected")
        algos.forEach(algo => {
            if(algo.classList.contains("selected") && algo !== alg)
                algo.classList.remove("selected")
        })
    })
})
option.forEach(opt => {
    opt.addEventListener("click", (e) => {
        const clicked = e.target
        if(!clicked.classList.contains("selected")) {
            clicked.classList.add("selected")
            option.forEach(optt => {
                if (optt.classList.contains("selected") && optt !== opt)
                    optt.classList.remove("selected")
            })
        }
        else
            clicked.classList.remove("selected")
    })
})
let nums = []
let speed = 10
const MARGINITEM = 1
const speedField = document.querySelector(".speedField")
//Default speed
speedField.value = 700
speedField.addEventListener("change", () => {
    document.querySelector(".speedValue").textContent = speedField.value
})
document.querySelector(".edButton").addEventListener("click", () => {
    document.querySelector(".edButton").classList.add("selected")
})
let optSelected = false

document.querySelector(".startSort").addEventListener("click", () => {
   nums = document.querySelector(".numsField").value
    nums = nums.split(',')
    for(let i = 0; i < nums.length; i++)
        nums[i] = parseInt(nums[i])
    const area = document.querySelector("#area")
    area.innerHTML = ''
    const numsObj = []

    speed = document.querySelector(".speedField").value
    document.querySelector(".speedValue").textContent = speed

        option.forEach(opt => {
            if (opt.classList.contains("selected")) {
                nums = []
                if (opt.classList.contains("asc")) {
                    optSelected = true
                    for (let i = 0; i < 30; i++)
                        nums.push(i)
                }
                if (opt.classList.contains("random")) {
                    optSelected = true
                    for (let i = 0; i < 30; i++) {
                        let num = Math.round(Math.random() * 20)
                        nums.push(num)
                    }
                }


            }


        })
    nums.forEach((num, index) => {

        const newItem = document.createElement("div")
        newItem.textContent = String(num)
        newItem.classList.add("item")
        const colorNum = Math.round(Math.random() * 10)
        const colorClass = 'color' + colorNum
        newItem.classList.add(colorClass)
        newItem.style.height = document.documentElement.clientHeight / nums.length + 'px'
        newItem.style.width = 10 + (num * 10) + 'px'
        area.appendChild(newItem)
        numsObj.push(newItem)
    })
    let algoSelected = false

    if(nums.length > 1 || optSelected === true) {
        algos.forEach(algo => {
            if (algo.classList.contains("selected")) {
                algoSelected = true
                if (algo.classList.contains("bubble")) {
                    closeMenu()
                    const timeStart = performance.now()
                    if (document.querySelector(".edButton").classList.contains("selected"))
                        bubble(numsObj).then(() => {
                            document.querySelector(".execTime").textContent = String(performance.now() - timeStart) + ' ms'
                        })
                    else
                        bubble(numsObj).then(() => {
                            document.querySelector(".execTime").textContent = String(performance.now() - timeStart) + ' ms'
                        })
                } else if (algo.classList.contains("quick")) {
                    closeMenu()
                    const timeStart = performance.now()
                    if (document.querySelector(".edButton").classList.contains("selected")) {
                        document.querySelector(".info").textContent = "The items with black border are the pivots of Quick Sort" +
                            ". The current pivot is the one closest to the top, it will try to sort everything above it. After it finishes" +
                            " it will move to the next pivot below the current one."
                        quickSortEducational(0, numsObj.length - 1, numsObj).then(() => {
                            document.querySelector(".execTime").textContent = String(performance.now() - timeStart) + ' ms'
                        })
                    } else
                        quickSort(0, numsObj.length - 1, numsObj).then(() => {
                            document.querySelector(".execTime").textContent = String(performance.now() - timeStart) + ' ms'
                        })
                } else if (algo.classList.contains("selection")) {
                    closeMenu()
                    const timeStart = performance.now()
                    if (document.querySelector(".edButton").classList.contains("selected")) {
                        speed = 1500
                        speedField.value = 1500
                        document.querySelector(".speedValue").textContent = 1500
                        document.querySelector(".info").textContent = "The item with black border is the maximum that the Selection Sort found up to that point" +
                            " and they are to be changed with the item that has a red border"
                        selectionSortEducational(numsObj).then(() => {
                            document.querySelector(".execTime").textContent = String(performance.now() - timeStart) + ' ms'
                        })
                    } else
                        selectionSort(numsObj).then(() => {
                            document.querySelector(".execTime").textContent = String(performance.now() - timeStart) + ' ms'
                        })
                }
                else if (algo.classList.contains("heap")) {
                    closeMenu()
                    const timeStart = performance.now()
                    // if (document.querySelector(".edButton").classList.contains("selected")) {
                    //     speed = 1500
                    //     speedField.value = 1500
                    //     document.querySelector(".speedValue").textContent = 1500
                    //     document.querySelector(".info").textContent = "The item with black border is the maximum that the Selection Sort found up to that point" +
                    //         " and they are to be changed with the item that has a red border"
                    //     selectionSortEducational(numsObj).then(() => {
                    //         document.querySelector(".execTime").textContent = String(performance.now() - timeStart) + ' ms'
                    //     })
                    // } else
                        heapSort(numsObj).then(() => {
                            document.querySelector(".execTime").textContent = String(performance.now() - timeStart) + ' ms'
                        })
                }

            }
        })
    }
        const errTextNums = document.querySelector(".errNums")
            if(optSelected === false && nums.length <= 1) {
                if (errTextNums.classList.contains("errNumsVisible"))
                    errTextNums.classList.remove("errNumsVisible")
                setTimeout(() => {
                    errTextNums.classList.add("errNumsVisible")
                }, 1)
            }
            else
                errTextNums.classList.remove("errNumsVisible")


    const errText = document.querySelector(".errAlgo")
    if(!algoSelected) {
        if (errText.classList.contains("errAlgoVisible"))
            errText.classList.remove("errAlgoVisible")
        setTimeout(() => {
            errText.classList.add("errAlgoVisible")
        },1)

    }
    else
        errText.classList.remove("errAlgoVisible")


})




