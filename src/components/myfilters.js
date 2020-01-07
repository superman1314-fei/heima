
export const dateFormat =(tiem,spe)=>{
    tiem=new Date(tiem)
    spe=spe||'-'
    let year = tiem.getFullYear()
    let monte = tiem.getMonth()+1
    let day = tiem.getDate()
    return `${year}${spe}${monte}${spe}${day}`
}