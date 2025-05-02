import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const useDocumentTitle = () => {
    const location = useLocation()

    useEffect(() => {
        const path = location.pathname
        let title = ''

        // Map routes to their corresponding titles
        const routeTitles = {
            '/': 'Home | StudyNotion',
            '/login': 'Login | StudyNotion',
            '/signup': 'Signup | StudyNotion',
            '/about': 'About | StudyNotion',
            '/contact': 'Contact Us | StudyNotion',
            '/catalog': 'Catalog | StudyNotion',
            '/courses': 'Courses | StudyNotion',
            '/dashboard': 'Dashboard | StudyNotion',
            '/dashboard/my-profile': 'My Profile | StudyNotion',
            '/dashboard/settings': 'Settings | StudyNotion',
            '/dashboard/enrolled-courses': 'Enrolled Courses | StudyNotion',
            '/dashboard/cart': 'Cart | StudyNotion',
            '/dashboard/add-course': 'Add Course | StudyNotion',
            '/dashboard/my-courses': 'My Courses | StudyNotion',
            '/dashboard/instructor': 'Instructor Dashboard | StudyNotion',
            '/dashboard/edit-course': 'Edit Course | StudyNotion',
            '/view-course': 'View Course | StudyNotion',
        }

        // Find the matching route title
        for (const [route, routeTitle] of Object.entries(routeTitles)) {
            if (path.startsWith(route)) {
                title = routeTitle
                break
            }
        }

        // If no matching route found, use a default title
        if (!title) {
            title = 'StudyNotion'
        }

        document.title = title
    }, [location.pathname])
}

export default useDocumentTitle 