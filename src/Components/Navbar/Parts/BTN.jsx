import {useEffect} from 'react'
import {Link, useHistory, useLocation} from 'react-router-dom'
import {useSelector} from 'react-redux'

export default function BTN({type}) {
    const location = useLocation()
    const balance = useSelector((state) => state.data.balance)
    const path = location.pathname
    const tokens = parseInt(useSelector((state) => state.stakeData.tokensAmount))
    const history = useHistory()

    useEffect(() => {}, [balance])

    return type === 'Stake' ? (
        <div
            onClick={() => (location.pathname === '/stake' ? '' : history.push('/stake'))}
            className={path === '/stake' || path === '/' ? 'navbar__btn--active' : 'navbar__btn'}>
            <span>{`${type} XPNET`}</span>
        </div>
    ) : tokens ? (
        <div
            onClick={() => (location.pathname === '/claim' ? '' : history.push('/claim'))}
            className={path === '/claim' || path === '/' ? 'navbar__btn--active' : 'navbar__btn'}>
            <span>{`${type} XPNET`}</span>
        </div>
    ) : (
        <div className="navbar__btn--disabled">
            <span>{`${type} XPNET`}</span>
        </div>
    )
}
