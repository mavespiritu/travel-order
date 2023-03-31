import { useState, useEffect } from "react"
import { Outlet, useOutlet, useLocation, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"

import List from "./List"
import ProtectedPageWrapper from "../../components/ProtectedPageWrapper"
import PageHeader from "../../components/PageHeader"
import Breadcrumbs from "../../components/BreadCrumbs"
import SearchForm from "../../components/Data/Filter/SearchForm"
import DateRangeSelect from "../../components/Data/Filter/DateRangeSelect"
import csrfToken from '../../library/csrfToken'
import { getRecords } from "./api"

function TravelOrder() {
    const outlet = useOutlet()

    const [title, setTitle] = useState('Travel Orders')
    const { id } = useParams()
    const location = useLocation()
    const [filters, setFilters] = useState({})
    const [records, setRecords] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [pagination, setPagination] = useState({})
    const [refresh, setRefresh] = useState(false)
    const disabled = location.pathname !== '/travel-orders'

    const setCrumb = (pathname, id) => {

        let crumb = []

        if (pathname === '/travel-orders') {
            crumb = [
            {
                name: 'Travel Orders',
                to: pathname
            }
            ]
        }

        if (pathname === '/travel-orders/add') {
            crumb = [
            {
                name: 'Travel Orders',
                to: '/travel-orders'
            },
            {
                name: 'Add New Travel Order',
                to: pathname
            }
            ]
        }

        if (pathname.includes(`/travel-orders/update/${id}`)) {
            crumb = [
            {
                name: 'Travel Orders',
                to: '/travel-orders'
            },
            {
                name: 'Edit Travel Order',
                to: pathname
            }
            ]
        }

        if (pathname.includes(`/travel-orders/view/${id}`)) {
            crumb = [
            {
                name: 'Travel Orders',
                to: '/travel-orders'
            },
            {
                name: 'View Travel Order',
                to: pathname
            }
            ]
        }

        return crumb
    }

    const handleDateRange = (dates) => {
        if (dates.length === 0) {
          const filtersCopy = {...filters}
          filtersCopy.dates = []
          setFilters(filtersCopy)
        }
        if (dates.length === 2) {
          const filtersCopy = {...filters}
          filtersCopy.dates = [
            moment(dates[0]).format("YYYY-MM-DD"),
            moment(dates[1]).format("YYYY-MM-DD"),
          ]
          setFilters(filtersCopy)
        }
      }

    const csrf = useQuery(['csrfToken'], csrfToken)
    const results = useQuery(['travelOrderList', currentPage, filters], () => getRecords({ page: currentPage, filters }), {
        enabled: csrf?.isSuccess,
        keepPreviousData : true,
        onSuccess: (res) => {
        const { data, pagination } = res?.data?.data
        setRecords(data)
        setPagination(pagination)
        }
    })

    useEffect(() => {
        if (location.pathname === '/travel-orders') {
          if (refresh) {
            results.refetch()
            setRefresh(false)
          }
        } else {
          setRefresh(true)
        }
    })

    return (
        <ProtectedPageWrapper title={title} >
            <Breadcrumbs items={setCrumb(location.pathname, id)} />
            <PageHeader
                title="Travel Orders"
                createTitle="Add New"
                to="/travel-orders/add"
            >
                <SearchForm
                    filters={filters}
                    setFilters={setFilters}
                    results={results}
                    placeholder="Search travel orders"
                    disabled={disabled}
                />

                <DateRangeSelect
                    className=''
                    handleChange={handleDateRange}
                    disabled={disabled}
                />
            </PageHeader>
        {
            outlet
            ?
            <Outlet />
            :
            <List 
                records={records}
                pagination={pagination}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                results={results}
            />
        }
        </ProtectedPageWrapper>
    )
}

export default TravelOrder