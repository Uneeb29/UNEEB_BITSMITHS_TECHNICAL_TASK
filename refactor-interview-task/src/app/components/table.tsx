"use client"

import type React from "react"

import { useState, useEffect, useRef, useMemo, useCallback } from "react"

export type Issue = {
  id: string
  name: string
  message: string
  status: "open" | "resolved"
  numEvents: number
  numUsers: number
  value: number
}

type TableProps = {
  issues: Issue[]
}


//Table component for displaying and managing a list of issues
const Table = ({ issues }: TableProps) => {
  // Store only the checked state, derive other states when needed
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({})
  const selectAllCheckboxRef = useRef<HTMLInputElement>(null)

  // Memoize the count of open issues
  const openIssuesCount = useMemo(() => {
    return issues.filter((issue) => issue.status === "open").length
  }, [issues])

  // Memoize the IDs of open issues
  const openIssueIds = useMemo(() => {
    return new Set(issues.filter((issue) => issue.status === "open").map((issue) => issue.id))
  }, [issues])

  // Calculate the total value of selected issues
  const totalSelectedValue = useMemo(() => {
    return issues.reduce((sum, issue) => {
      if (checkedItems[issue.id] && issue.status === "open") {
        return sum + issue.value
      }
      return sum
    }, 0)
  }, [issues, checkedItems])

  // Determine if all open issues are selected
  const allOpenIssuesSelected = useMemo(() => {
    return (
      openIssuesCount > 0 &&
      openIssuesCount === Object.keys(checkedItems).filter((id) => checkedItems[id] && openIssueIds.has(id)).length
    )
  }, [openIssuesCount, checkedItems, openIssueIds])

  // Determine if some (but not all) open issues are selected
  const someOpenIssuesSelected = useMemo(() => {
    const selectedOpenCount = Object.keys(checkedItems).filter((id) => checkedItems[id] && openIssueIds.has(id)).length
    return selectedOpenCount > 0 && selectedOpenCount < openIssuesCount
  }, [checkedItems, openIssuesCount, openIssueIds])

  // Update the indeterminate state of the "select all" checkbox
  useEffect(() => {
    if (selectAllCheckboxRef.current) {
      selectAllCheckboxRef.current.indeterminate = someOpenIssuesSelected
    }
  }, [someOpenIssuesSelected])

  // Handle individual checkbox changes
  const handleCheckboxChange = useCallback((issueId: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [issueId]: !prev[issueId],
    }))
  }, [])

  // Handle "select all" checkbox changes
  const handleSelectAll = useCallback(() => {
    if (allOpenIssuesSelected) {
      // Deselect all if all are currently selected
      setCheckedItems({})
    } else {
      // Select all open issues
      const newCheckedItems: Record<string, boolean> = {}
      issues.forEach((issue) => {
        if (issue.status === "open") {
          newCheckedItems[issue.id] = true
        }
      })
      setCheckedItems(newCheckedItems)
    }
  }, [allOpenIssuesSelected, issues])

  return (
    <table className="w-full border-collapse shadow-lg">
      <thead>
        <tr className="border-2 border-gray-200">
          <th className="py-6 pl-6 text-left w-[48px]">
            <input
              className="w-5 h-5 cursor-pointer"
              type="checkbox"
              id="select-all-checkbox"
              ref={selectAllCheckboxRef}
              checked={allOpenIssuesSelected}
              onChange={handleSelectAll}
            />
          </th>
          <th className="py-6 min-w-[8rem] text-left text-black">
            {totalSelectedValue > 0 ? `Selected ${totalSelectedValue}` : "None selected"}
          </th>
          <th colSpan={2} />
        </tr>
        <tr className="border-2 border-gray-200">
          <th className="py-6 pl-6" />
          <th className="py-6 text-left font-medium text-black">Name</th>
          <th className="py-6 text-left font-medium text-black">Message</th>
          <th className="py-6 text-left font-medium text-black">Status</th>
        </tr>
      </thead>

      <tbody>
        {issues.map((issue) => (
          <IssueRow
            key={issue.id}
            issue={issue}
            isChecked={!!checkedItems[issue.id]}
            onCheckboxChange={handleCheckboxChange}
          />
        ))}
      </tbody>
    </table>
  )
}

// Separate component for issue rows to improve readability and maintainability
type IssueRowProps = {
  issue: Issue
  isChecked: boolean
  onCheckboxChange: (issueId: string) => void
}

const IssueRow = ({ issue, isChecked, onCheckboxChange }: IssueRowProps) => {
  const { id, name, message, status } = issue
  const isOpen = status === "open"

  // Handle row click - only for open issues
  const handleRowClick = () => {
    if (isOpen) {
      onCheckboxChange(id)
    }
  }

  // Handle checkbox click - prevent event bubbling
  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onCheckboxChange(id)
  }

  return (
    <tr
      className={`
        border-b border-gray-200
        ${isOpen ? "cursor-pointer hover:bg-blue-50 text-black" : "text-gray-600 cursor-not-allowed"}
        ${isChecked && isOpen ? "bg-blue-50" : ""}
      `}
      onClick={isOpen ? handleRowClick : undefined}
    >
      <td className="py-6 pl-6">
        {isOpen ? (
          <input
            className="w-5 h-5 cursor-pointer"
            type="checkbox"
            checked={isChecked}
            onChange={() => onCheckboxChange(id)}
            onClick={handleCheckboxClick}
          />
        ) : (
          <input className="w-5 h-5 opacity-50" type="checkbox" disabled />
        )}
      </td>
      <td className="py-6">{name}</td>
      <td className="py-6">{message}</td>
      <td className="py-6">
        <StatusIndicator status={status} />
      </td>
    </tr>
  )
}

// Separate component for status indicator to improve reusability
const StatusIndicator = ({ status }: { status: Issue["status"] }) => {
  const isOpen = status === "open"

  return (
    <div className="flex items-center gap-2">
      <span className={`inline-block w-[15px] h-[15px] rounded-full ${isOpen ? "bg-blue-600" : "bg-gray-400"}`} />
      <span className={`font-medium ${isOpen ? "text-blue-700" : "text-gray-700"}`}>
        {isOpen ? "Open" : "Resolved"}
      </span>
    </div>
  )
}

export default Table

