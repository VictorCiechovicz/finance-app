import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ImportTable } from './ImportTable'

const dateFormat = 'yyyy-MM-dd HH:mm:ss'
const outputFormat = 'yyyy-MM-dd'

const requiredOptions = ['amount', 'date', 'payee']

interface SelectedColumnsState {
  [key: string]: string | null
}

type Props = {
  data: string[][]
  onSubmit: (data: any) => void
  onCancel: () => void
}

export const ImportCard = ({ data, onSubmit, onCancel }: Props) => {
  const [selectedColumns, setSelectedColumns] = useState<SelectedColumnsState>(
    {}
  )
  const headers = data[0]
  const body = data.slice(1)
  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">
            Import Transaction
          </CardTitle>
          <div className="flex items-center gap-x-2">
            <Button size="sm" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ImportTable
            headers={headers}
            body={body}
            selectedColumns={selectedColumns}
            onTableHeadSelectChange={() => {}}
          />
        </CardContent>
      </Card>
    </div>
  )
}
