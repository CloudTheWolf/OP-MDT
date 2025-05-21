import { useSession } from '@tanstack/react-start/server'

type SessionUser = {
    userEmail: User['email']
}

export function useAppSession() {
    return useSession<SessionUser>({
        password: 'ChangeThisBeforeShippingToProdOrYouWillBeFired',
    })
}
