import { Upload } from 'lucide-react'
import { useCSVReader } from 'react-papaparse'
import { Button } from '@/components/ui/button'

type Props = { onOpload: (results: any) => void }

export const UploadButton = ({ onOpload }: Props) => {
  const { CSVReader } = useCSVReader()
  return (
    <CSVReader>
      {({ getRootProps }: any) => (
        <Button size="sm" className="w-full lg:w-auto" {...getRootProps()}>
          <Upload className="size-4 mr-2" />
          Import
        </Button>
      )}
    </CSVReader>
  )
}
